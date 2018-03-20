# Formatted Number Extension for Yii 2

For license information check the [LICENSE](LICENSE.md)-file.

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist grenhaz/yii2-formattednumber
```

or add

```json
"grenhaz/yii2-formattednumber": "~1.0.0"
```

to the `require` section of your composer.json.

Basic Usage
-----------

```php
<?= $form->field( $model, 'number' )
        ->widget( FormattedNumberWidget::classname(), [
            "plugin" => [
                "decimals" => 2
            ]
        ] ) ?>
```

Example
-------

![Example](example.png?raw=true "Example")

Configuration
-------------

 * decimals - Number of decimals to show.
    default: 2
 * thousandSeparator - Thousand separator character.
    default: (empty)
 * decimalSeparator - Decimal separator character.
    default: .
 * emptyAllowed - Allow empty values.
    default: true
 * forceDecimals - Force to show or not all decimals.
    default: true
 * align - Text alignment.
    default: right
