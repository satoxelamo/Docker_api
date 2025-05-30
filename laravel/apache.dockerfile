

FROM php:8.3-apache

# Instalar las dependencias necesarias
RUN apt-get update && apt-get install -y \
    zip unzip curl git libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Activar el módulo de Apache para reescritura de URLs
RUN a2enmod rewrite

COPY . /var/www/html

# Copiar el archivo de configuración de Apache
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Establecer el directorio de trabajo
WORKDIR /var/www/html

COPY baseDatos.sh /baseDatos.sh

RUN chmod +x /baseDatos.sh

EXPOSE 80
CMD [ "/baseDatos.sh" ]