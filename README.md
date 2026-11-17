# pauloignovo

## Vídeos

Os vídeos são `.mp4` servidos pelo próprio site (abrem em tela cheia e já
tocam, inclusive no iPhone). Esses arquivos **não vão para o git**:
ficam na pasta `videos/`, ao lado do `docker-compose.yml`, que é montada no
container.

Nome do arquivo = nome do artista sem acento, igual às miniaturas
(ex.: `videos/sr-pedro-tupinikim.mp4`), e o caminho vai no `dados.js`.

Formato: MP4 H.264 720p com `faststart`. Para converter um vídeo novo:

```bash
ffmpeg -i original.mov -vf "scale=-2:720,format=yuv420p" -c:v libx264 -preset medium \
  -crf 23 -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -movflags +faststart \
  videos/nome-do-artista.mp4
```

Os originais (HEVC, ~300 MB cada) ficam em `videos1/`, também fora do git.

Para enviar ao servidor (da sua máquina):

```bash
scp videos/*.mp4 usuario@servidor:/caminho/do/projeto/videos/
```

Trocar ou adicionar vídeo não precisa rebuild: basta copiar o arquivo.
