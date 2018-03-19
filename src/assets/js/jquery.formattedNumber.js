$.fn.formattedNumber = function ( config ) {
    // Opciones básicas
    var options = $.extend({
        'decimals': 2,
        'thousandSeparator': '.',
        'decimalSeparator': ',',
        'emptyAllowed': true,
        'forceDecimals': true,
        'align': 'right'
    }, config);
    
    return this.each(function () {
        var $this = $(this);
        if ($this.data('formatted-number') !== '1') {
            $this.data('formatted-number', '1');
            
            function __convertNumber(value) {
                if (options['emptyAllowed'] && $.trim(value) === '') return $.trim(value);
                
                if ($.trim(value) === '' || value === undefined) value = '0';
                
                // Eliminar los thousandSeparators
                if (options['thousandSeparator'] !== undefined && options['thousandSeparator'] !== '') {
                    value = value.split(options['thousandSeparator']).join('');
                }

                // Cambiar el decimalSeparator
                value = value.replace(options['decimalSeparator'], '.');
                
                return value;
            }
            function __addCommas(nStr) {
                nStr += '';
                var x = nStr.split(options['decimalSeparator']);
                var x1 = x[0];
                var x2 = x.length > 1 ? options['decimalSeparator'] + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + options['thousandSeparator'] + '$2');
                }
                return x1 + x2;
            }
            function __revertNumber(value) {
                if (options['emptyAllowed'] && $.trim(value) === '') return $.trim(value);
                
                if (isNaN(value) || $.trim(value) === '' || value === undefined) value = '0';
                
                // Incluir decimales
                if (options['decimals'] >= 0) {
                    value = parseFloat(value);
                    if (options['forceDecimals']) {
                        value = value.toFixed(options['decimals']);
                    }
                    value = '' + value;
                }

                // Cambiar el decimalSeparator
                value = value.replace('.', options['decimalSeparator']);
                
                // Añadir los thousandSeparators
                if (options['thousandSeparator'] !== undefined && options['thousandSeparator'] !== '') {
                    //value = value.split(options['thousandSeparator']).join('');
                    // Buscar el separador decimal común
                    value = __addCommas(value);
                }
                
                return value;
            }
            function __editableNumber(value) {
                if (options['emptyAllowed'] && $.trim(value) === '') return $.trim(value);
                
                // Obtener el valor original
                var original = __convertNumber(value);
                
                // Eliminar decimales innecesarios
                value = parseFloat(original);
                value = '' + value;
                
                // Cambiar el decimalSeparator
                value = value.replace('.', options['decimalSeparator']);
                
                return value;
            }
            function __formatNumber(value) {
                if (options['emptyAllowed'] && $.trim(value) === '') return $.trim(value);
                
                // Obtener el valor original
                var original = __convertNumber(value);
                
                // Eliminar decimales innecesarios
                if (options['decimals'] >= 0) {
                    value = parseFloat(original);
                    if (options['forceDecimals']) {
                        value = value.toFixed(options['decimals']);
                    }
                    value = '' + value;
                }
                
                return __revertNumber(value);
            }
            function __keydownControl(e) {
                if (e !== undefined) {
                    // Control keys
                    if ($.inArray(e.keyCode, [8, 9, 27, 13, 46]) !== -1 ||
                        // Allow: Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z, Ctrl+Y, Ctrl+A
                        ($.inArray(e.keyCode, [65, 67, 86, 90, 85, 88]) !== -1 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
                        // Allow: home, end, left, right, down, up
                        (e.keyCode >= 35 && e.keyCode <= 40)) {
                        return true;
                    }
                    
                    // Numbers
                    if (!e.shiftKey &&
                        ((e.keyCode >= 48 && e.keyCode <= 57) ||
                         (e.keyCode >= 96 && e.keyCode <= 105))) {
                        return true;
                    }
                    
                    if (e.key === options['decimalSeparator'] && options['decimals'] > 0) {
                        // Sólo un separador decimal
                        var value = $(e.target).val();
                        return (value.indexOf(options['decimalSeparator']) < 0);
                    }
                }
                
                return false;
            }
            
            // Corregir el valor original del input
            var value = $this.val();
            if (!options['emptyAllowed'] && $.trim(value) === '') $this.val('0').trigger('change');
            if (isNaN(value) || value === undefined) $this.val('0').trigger('change');
            
            // Crear el clon visible
            var $clone = $this.clone();
            $clone
                .css('text-align', options['align'])
                .removeAttr('id')
                .removeAttr('name')
                .on('keydown', function (e) {
                    return __keydownControl(e);
                })
                .on('keyup', function () {
                    $this.val(__convertNumber($clone.val())).trigger('keyup');
                })
                .on('change', function () {
                    $this.val(__convertNumber($clone.val())).trigger('change');
                })
                .on('focus', function () {
                    $clone.val(__editableNumber($clone.val()));
                })
                .on('blur', function () {
                    $clone.val(__formatNumber($clone.val())).trigger('change');
                })
                .insertBefore($this);
        
                // TODO: En el COPY PASTE controlar por regular expression lo escrito
            
            // Eventos
            $this.on('change', function () {
                $clone.val(__revertNumber($this.val()));
            });
            
            $this.on('property.change', function () {
               $clone.prop('disabled', $this.prop('disabled'));
               $clone.prop('readonly', $this.prop('readonly'));
            });
            
            
            $clone.val(__revertNumber($this.val()));
            
            // Ocultar el original
            $this.hide();
            
            // Guardar los datos
            $this.data('clone', $clone);
        }
    });
};