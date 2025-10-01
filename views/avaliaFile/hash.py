import hashlib
import re
from pypdf import PdfReader
from rapidfuzz import fuzz
from unidecode import unidecode
import json
import fitz # PyMuPDF
import cv2
import numpy as np
from pyzbar.pyzbar import decode
import sys
from pathlib import Path

# Extrai texto do PDF
def extrair_texto_pdf(caminho_pdf):
    reader = PdfReader(caminho_pdf)
    conteudo = ""
    for pagina in reader.pages:
        texto = pagina.extract_text()
        if texto:
            conteudo += texto + " "
    return conteudo.strip()

# Normalizar texto
def normalizar_texto(texto):
    texto = unidecode(texto.lower()) # minúsculas e sem acentos
    texto = " ".join(texto.split()) # remove espaços extras
    return texto

# Gerar hash simples (para igualdade exata)
def gerar_hash(texto):
    return hashlib.sha256(texto.encode('utf-8')).hexdigest()

# Comparar com banco de dados
def verificar_duplicidade(novo_texto, base_documentos, similaridade_min=90):
    hash_novo = gerar_hash(novo_texto)

    for doc in base_documentos:
        # Verifica se o hash é igual (mesmo documento)
        if hash_novo == doc['hash']:
            return True, "Duplicado!"
        
        # Verifica similaridade (fuzzy matching)
        # score = fuzz.token_set_ratio(novo_texto, doc['texto'])
        # if score >= similaridade_min:
        #     return True, f"Provavelmente está Duplicado.: ({score:.1f}%)"
        
    return False, "Documento OK!"

# Extrai horas do PDF
def extrair_horas_do_texto(texto):
    # normaliza para evitar problemas com acentos e espaços estranhos
    texto_norm = unidecode(texto.replace("\xa0", " ")).lower()
    # procura padrões como "8 horas", "8h", "8,5 horas", "8.5h"
    padrao = r"(\d+(?:[.,]\d+)?)\s*(?:h|hr|hrs|hora|horas)\b"
    match = re.search(padrao, texto_norm)
    if match:
        return match.group(1).replace(",", ".")  # retorna como string, pronto para converter em float
    return None

# Extrair Metadados do PDF
def extrair_metadado(pdf_path):
    reader = PdfReader(pdf_path)
    
    # Metadados principais
    metadados = reader.metadata or {}

    # Busca modificações a partir da data de alteração (caso existir)
    creation = metadados.get("/CreationDate", "N/C")
    mod = metadados.get("/ModDate", "N/C")

    # Informações Técnicas
    info_tecnica = {
        "num_paginas": len(reader.pages),
        "tamanho_paginas": [page.mediabox for page in reader.pages], # largura e altura de cada página
        "tem_criptografia": reader.is_encrypted
    }

    # Hash do arquivo (base binária)
    with open(pdf_path, "rb") as f:
        conteudo = f.read()
        hash_md5 = hashlib.md5(conteudo).hexdigest()
        hash_sha1 = hashlib.sha1(conteudo).hexdigest()
        hash_sha256 = hashlib.sha256(conteudo).hexdigest()

    # Extração de texto do PDF
    texto = ""
    for page in reader.pages:
        page_text = page.extract_text() or ""
        texto += page_text.strip() + "\n"

    # Hash baseado apenas no texto (normalizando espaços e letras)
    texto_normalizado = " ".join(texto.split()).lower()
    hash_texto_md5 = hashlib.md5(texto_normalizado.encode("utf-8")).hexdigest()
    hash_texto_sha1 = hashlib.sha1(texto_normalizado.encode("utf-8")).hexdigest()
    hash_texto_sha256 = hashlib.sha256(texto_normalizado.encode("utf-8")).hexdigest()

    hashes = {
        "arquivo_md5": hash_md5,
        "arquivo_sha1": hash_sha1,
        "arquivo_sha256": hash_sha256,
        "texto_md5": hash_texto_md5,
        "texto_sha1": hash_texto_sha1,
        "texto_sha256": hash_texto_sha256
    }

    return {
        "metadados": metadados,
        "info_tecnica": info_tecnica,
        "hashes": hashes,
        "dateCreateFile": creation,
        "dateModifield": mod
    }

# Leitura do QRCode do PDF
def ler_qrcode(pdf_path):
    pdf = fitz.open(pdf_path)
    conteudos = []

    for page_index in range(len(pdf)):
        page = pdf[page_index]
        pix = page.get_pixmap(matrix=fitz.Matrix(3, 3))
        img_data = pix.tobytes("png")

        img_array = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        qrcodes = decode(img)
        for qr in qrcodes:
            data = qr.data.decode("utf-8")
            conteudos.append(data)
    
    pdf.close()
    return conteudos

# -------------------------------
# Simulação de uso
# -------------------------------

if __name__ == "__main__":
    # Banco de PDFs já avaliados (simulação)
    base_documentos = []

    # Lê JSON da entrada padrão (STDIN)
    entrada_json = sys.stdin.read()
    dados = json.loads(entrada_json)

    # busca texto enviado para o python
    nomeArq = dados.get("nomeArq", "Desconhecido")

    # pasta onde está este script (hash.py)
    base = Path(__file__).resolve().parent

    # arquivo a ser avaliado dentro da pasta "arquivos"
    caminho_pdf = base / "arquivos" / nomeArq

    # verifica se existe esse arquivo
    if not caminho_pdf.exists():
        raise FileNotFoundError(f"Certificado não encontrado: {caminho_pdf}")

    # Carrega um PDF novo
    # caminho_pdf = "./arquivos/Certificado_Saber_Virtual-Matemática1.pdf"

    # Teste da extração do QRCode
    qrcode_textos = ler_qrcode(caminho_pdf)
    #print("QR Codes extraídos: ", qrcode_textos)

    texto_extraido = extrair_texto_pdf(caminho_pdf)
    #print(f"Texto Extraído.: ({texto_extraido})")
    texto_normalizado = normalizar_texto(texto_extraido)
    #print(f"Texto normalizado.: ({texto_normalizado})")
    hash_documento = gerar_hash(texto_normalizado)

    # Captura a quantidade de horas
    horas = extrair_horas_do_texto(texto_extraido)
    # if horas:
    #     print("Quantidade de horas encontrada:", horas)
    # else:
    #     print("Nenhuma quantidade de horas encontrada")

    # Salva na "base" (primeira avaliação)
    base_documentos.append({"hash": hash_documento, "texto": texto_normalizado})
    #print("Documento cadastrado!")

    # Testa outro PDF
    # caminho_pdf_teste = base / "arquivos" / "Certificado_Saber_Virtual-Matemática2.pdf"
    certs_dir = base / "arquivos"

    if certs_dir.exists():
        for caminho_pdf_teste in certs_dir.glob("*.pdf"):
            # Teste da extração do QRCode
            qrcode_textos = ler_qrcode(caminho_pdf_teste)
            #print("QR Codes extraídos: ", qrcode_textos)

            # Busca metadados do arquivo 1
            # metadados = extrair_metadado(caminho_pdf)
            # if metadados:
            #     for chave, valor in metadados.items():
            #         print(f"{chave}.:{valor}")
            
            # Busca metadados do arquivo 2
            # metadados2 = extrair_metadado(caminho_pdf_teste)
            # if metadados2:
            #     for chave, valor in metadados2.items():
            #         print(f"{chave}.:{valor}")

            texto_extraido_teste = extrair_texto_pdf(caminho_pdf_teste)
            #print(f"Texto Extraído.: ({texto_extraido_teste})")
            texto_teste = normalizar_texto(texto_extraido_teste)
            #print(f"Texto normalizado.: ({texto_teste})")

            # Captura a quantidade de horas
            horas = extrair_horas_do_texto(texto_extraido)
            # if horas:
            #     print(f"Quantidade de horas encontrada:", horas)
            # else:
            #     print("Nenhuma quantidade de horas encontrada")

            duplicado, motivo = verificar_duplicidade(texto_teste, base_documentos)

    # Colocando o motivo dentro de um objeto
    resposta = {"mensagem": motivo}

    # Convertendo para string JSON
    json_string = json.dumps(resposta)
    print(f"{json_string}")
