# procecss-google-dataset
[![license](https://img.shields.io/github/license/masesk/process-google-dataset.svg)](https://github.com/masesk/process-google-dataset/blob/master/README.md)
[![stars](https://img.shields.io/github/stars/masesk/process-google-dataset.svg?style=social)](https://github.com/masesk/process-google-dataset/stargazers)
[![forks](https://img.shields.io/github/forks/masesk/process-google-dataset?style=social)](https://github.com/masesk/process-google-dataset/network/members)

PGD is a tool that works on any operating system that is capable of running Chrome and Python. It has no limit to the number of images it can retrieve and download. It does not require any subprocess call or specific configuration.

## Google Extension

### Requirements

* Google Chrome

### Installation

#### Option 1 (Works on Linux)
1. Download CRX file from [latest release](https://github.com/masesk/process-google-dataset/releases).
2. Type ```chrome://extensions/``` in the *Chrome* browser top bar.
3. Toggle ```Developer Mode``` switch on from the top right corner.
4. Drag and drop the crx file to the middle of the window.

#### Option 2 (Works on Windows and Linux)
1. Clone the [process-google-dataset](https://github.com/masesk/process-google-dataset/) repo.
2. Type ```chrome://extensions/``` in the *Chrome* browser top bar.
3. Toggle ```Developer Mode``` switch on from the top right corner.
4. Click ```Load Unpacked``` and select the cloned repo directory.

### How to use

1. Navigate to [https://images.google.com](https://images.google.com).
2. Search for the dataset keyword. (eg. car)
3. To get more data, simply keep scrolling to the bottom of the search 
page and loading more data. The tool will retrive all the data it can see. 
4. Find the extension logo at the top right corner and click "Parse and Download Metadata".
5. A JSON file will be downloaded to the "Downloads" directory.

## Python Downloader

### Requirements

* Python 3

### How to use

#### Example

```
python3 download.py --json-path /path/to/downloaded/json/file/from/extension/ --label cars --output-dir /path/to/output/directory
```

#### All options

```
--label
    Name of subdirectory/label that describes data.

--json-path
    Path to JSON file downloaded from extension.

--output-dir
    Directory where a new directory will be created based on label name and the images will be stored.

--timeout 
    (OPTIONAL) Timeout time in seconds when the downloader will move on to the next image.

```