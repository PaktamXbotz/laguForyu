import whois
import dns.resolver
import requests
from bs4 import BeautifulSoup

def perform_whois_lookup(domain):
    try:
        w = whois.whois(domain)
        return w
    except Exception as e:
        return f"Error retrieving WHOIS data: {e}"

def perform_dns_lookup(domain):
    try:
        answers = dns.resolver.resolve(domain, 'A')
        return [answer.to_string() for answer in answers]
    except Exception as e:
        return f"Error retrieving DNS data: {e}"

def fetch_domains_from_url(url, domain_suffix):
    try:
        response = requests.get(url)
        print(f"Response status code: {response.status_code}")

        soup = BeautifulSoup(response.text, 'html.parser')
        links = soup.find_all('a')
        print(f"Found {len(links)} links on the page.")
        id_domains = list(set(link['href'] for link in links if link.get('href') and 'http' in link['href'] and domain_suffix in link['href']))


        print(f"Filtered domains: {id_domains if id_domains else 'No matching domains found.'}")


        return id_domains
    except Exception as e:
        return f"Error fetching domains: {e}"

def main():
    url = input("Enter a website URL (e.g., example.com/): ")
    domain_suffix = input("Enter the domain suffix to search for (e.g., co.id): ")
    print(f"\nFetching domains containing '{domain_suffix}':")
    id_domains = fetch_domains_from_url(url, domain_suffix)
    with open('fetched_domains.txt', 'w') as f:
        for domain in id_domains:
            f.write(domain + '\n')
    print(f"Fetched domains saved to 'fetched_domains.txt'")


if __name__ == "__main__":
    main()
