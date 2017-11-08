ssh administrator@arqss10.ing.puc.cl 'find /var/www/html/. -type f -name inline\* -exec rm {} \;'
ssh administrator@arqss10.ing.puc.cl 'find /var/www/html/. -type f -name vendor\* -exec rm {} \;'
ssh administrator@arqss10.ing.puc.cl 'find /var/www/html/. -type f -name styles\* -exec rm {} \;'
ssh administrator@arqss10.ing.puc.cl 'find /var/www/html/. -type f -name styles\* -exec rm {} \;'
ssh administrator@arqss10.ing.puc.cl 'find /var/www/html/. -type f -name polyfills\* -exec rm {} \;'
ssh administrator@arqss10.ing.puc.cl 'rm /var/www/html/index.html'
ssh administrator@arqss10.ing.puc.cl 'rm /var/www/html/favicon.ico'
ng build --prod && cd ./dist && sudo scp -r . administrator@arqss10.ing.puc.cl:/var/www/html/