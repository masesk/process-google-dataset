import argparse
import json
import os
import urllib.request
import socket
import platform

parser = argparse.ArgumentParser()
parser.add_argument(
    '--json-path', help='Path to JSON file containing array of image URLS', required=True)
parser.add_argument(
    '--label', help='Label your data to create a folder containing the pictures', required=True)
parser.add_argument(
    '--output-dir', help='Label your data to create a folder containing the pictures', required=True)
parser.add_argument(
    '--timeout', help='Set the timeout time to stop trying to download an image', type=int, default=10)
args = parser.parse_args()


def create_directory(dir, label):
    if not os.path.exists(f"{dir}/{label}"):
        os.makedirs(f"{dir}/{label}")

def download_images(json_path, output_dir, label, timeout):

    socket.setdefaulttimeout(timeout)
    counter = 1
    total = 0
    try:
        with open(args.json_path) as f:
            d = json.load(f)
            for img in d:
                total += 1

                try:
                    print(f"[{round(((total/len(d))*100))}%] Downloading", img)
                    filepath = f"{output_dir}/{label}/{counter}"
                    local_filename, headers = urllib.request.urlretrieve(
                        img, filepath)
                    if headers.get_content_maintype() != "image":
                        os.remove(filepath)
                        print("Skipped", img)
                        continue
                    if platform.system() == "Windows":
                        os.rename(filepath, f"{filepath}.{headers.get_content_subtype()}")
                    print("Downloaded", img)
                    counter += 1
                except urllib.error.HTTPError:
                    print("Skipped", img)
                except Exception:
                    print("Skipped", img)
    except FileNotFoundError as e:
        print("error: invalid path for JSON file passed for argument --json")


create_directory(args.output_dir, args.label)
download_images(args.json_path, args.output_dir, args.label, args.timeout)
