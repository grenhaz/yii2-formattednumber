<?php
namespace grenhaz\formattednumber;

use yii\web\AssetBundle;

/**
 * Clase para cargar los recursos del formatted input.
 * 
 * @author obarcia
 */
class FormattedNumberWidgetAssets extends AssetBundle
{
    /**
     * JavaScript's
     * @var array
     */
    public $js = [
        'js/jquery.formattedNumber.js',
    ];
    /**
     * Dependencias
     * @var array
     */
    public $depends = [
        'yii\web\JqueryAsset',
    ];
    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->sourcePath = __DIR__ . "/assets";
        
        parent::init();
    }
}