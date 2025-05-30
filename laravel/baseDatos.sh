#!/bin/bash
set -e

if [ ! -d "vendor" ]; then
    composer install

    sed -i "s|protected \$except = .*;|protected \$except = ['api/*'];|" vendor/laravel/framework/src/Illuminate/Http/Middleware/VerifyCsrfToken.php

fi

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

until php artisan migrate --force; do
    echo "Esperando a que la base de datos esté disponible..."
    sleep 20
done
apache2-foreground
