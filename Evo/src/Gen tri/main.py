import random
import string
import os

def generate_code():
    code_length = 24
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(code_length))

def generate_discord_codes(num_codes, blacklist=set()):
    base_url = "https://promos.discord.gg/"
    codes = set()
    while len(codes) < num_codes:
        new_code = base_url + generate_code()
        if new_code not in blacklist:
            codes.add(new_code)
            blacklist.add(new_code)
    return codes

def save_to_file(codes, filename):
    try:
        with open(filename, 'a') as file:
            for code in codes:
                file.write(code + '\n')
    except IOError as e:
        print(f"Erro ao salvar no arquivo {filename}: {e}")

def load_blacklist(filename):
    if not os.path.exists(filename):
        return set()
    with open(filename, 'r') as file:
        return set(file.read().splitlines())

def save_blacklist(blacklist, filename):
    with open(filename, 'w') as file:
        file.write('\n'.join(blacklist))

if __name__ == "__main__":
    filename = "promos.txt"
    blacklist_file = "blacklist.txt"
    num_codes_to_generate = 1000000

    # Carrega a blacklist existente
    blacklist = load_blacklist(blacklist_file)

    # Gera os códigos
    codes = generate_discord_codes(num_codes_to_generate, blacklist)
    for i in range(0, len(codes), 10000):
        if len(codes) % 10000 == 0:
            print(f"{len(codes)} códigos gerados...")

    # Salva os códigos gerados
    save_to_file(codes, filename)

    # Atualiza a blacklist
    blacklist.update(codes)
    save_blacklist(blacklist, blacklist_file)

    print("Códigos gerados e salvos no arquivo promos.txt.")