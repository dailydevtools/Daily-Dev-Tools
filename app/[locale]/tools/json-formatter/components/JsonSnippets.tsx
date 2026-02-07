"use client";

import { useState } from "react";
import JsonEditor from "../../../../components/JsonEditor";
import CopyButton from "../../../../components/ui/CopyButton";
import { Download, AlertCircle } from "lucide-react";

interface JsonSnippetsProps {
    data: any; // The parsed JSON object
}

type SnippetLang = "javascript" | "python" | "go" | "java" | "csharp" | "php";

export default function JsonSnippets({ data }: JsonSnippetsProps) {
    const [lang, setLang] = useState<SnippetLang>("javascript");

    const generateSnippet = (language: SnippetLang, jsonData: any): string => {
        const jsonStr = JSON.stringify(jsonData, null, 2);
        const singleLineJson = JSON.stringify(jsonData);

        switch (language) {
            case "javascript":
                return `// Fetch with JSON body
fetch('https://api.example.com/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(${jsonStr.replace(/\n/g, '\n  ')})
})
.then(response => response.json())
.then(data => console.log(data));`;

            case "python":
                return `import requests

data = ${jsonStr.replace(/"/g, "'").replace(/true/g, "True").replace(/false/g, "False").replace(/null/g, "None")}

response = requests.post(
    'https://api.example.com/endpoint',
    json=data
)

print(response.json())`;

            case "go":
                return `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	url := "https://api.example.com/endpoint"
	jsonData := []byte(\`${singleLineJson}\`)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		panic(err)
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("Response Status:", resp.Status)
}`;

            case "java":
                return `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        String json = "${singleLineJson.replace(/"/g, '\\"')}";

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/endpoint"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`;
            case "csharp":
                return `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        using (var client = new HttpClient())
        {
            var url = "https://api.example.com/endpoint";
            var json = "${singleLineJson.replace(/"/g, '\\"')}";
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(url, data);
            string result = await response.Content.ReadAsStringAsync();
            Console.WriteLine(result);
        }
    }
}`;
            case "php":
                return `<?php

$url = 'https://api.example.com/endpoint';
$data = ${jsonStr.replace(/{/g, '[').replace(/}/g, ']').replace(/:/g, ' =>')};

$options = array(
    'http' => array(
        'header'  => "Content-Type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) { /* Handle error */ }

var_dump($result);
?>`;
            default:
                return "";
        }
    };

    const code = data ? generateSnippet(lang, data) : "";

    return (
        <div className="h-full flex flex-col">
            <div className="flex gap-2 mb-4 p-1 bg-neutral-100 dark:bg-white/5 rounded-lg w-fit overflow-x-auto max-w-full">
                {(["javascript", "python", "go", "java", "csharp", "php"] as SnippetLang[]).map((l) => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium uppercase transition-all whitespace-nowrap ${lang === l
                            ? "bg-white dark:bg-[#1e1e1e] text-[var(--foreground)] shadow-sm"
                            : "text-[var(--muted-text)] hover:text-[var(--foreground)]"
                            }`}
                    >
                        {l}
                    </button>
                ))}
            </div>

            <div className="flex-1 flex flex-col min-h-0 relative group">
                {/* Toolbar overlay */}
                <div className="absolute top-2 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton text={code} className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-md text-[var(--muted-text)] hover:text-[var(--foreground)] border border-[var(--border-color)]" />
                </div>

                <div className="flex-1 rounded-xl overflow-hidden border border-[var(--border-color)]">
                    <JsonEditor
                        value={code}
                        readOnly={true}
                        className="h-full w-full"
                    />
                </div>
            </div>
        </div>
    );
}
