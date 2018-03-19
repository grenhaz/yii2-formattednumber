<?php
namespace grenhaz\formattednumber;

use Yii;
use yii\widgets\InputWidget;
use yii\bootstrap\Html;
use yii\helpers\Json;

/**
 * Clase para cargar un numeric formateado.
 * 
 * @author obarcia
 */
class FormattedNumberWidget extends InputWidget
{
    /**
     * Base para el identificador del Widget.
     * @var string
     */
    public static $autoIdPrefix = 'wfnumber';
    /**
     * Valor del widget.
     * @var string
     */
    public $value = null;
    /**
     * Opciones del plugin.
     * @var boolean
     */
    public $plugin = [];
    
    /**
     * @inheritdoc
     */
    public function run()
    {
        FormattedNumberWidgetAssets::register($this->getView());
        
        Html::addCssClass( $this->options, 'form-control' );
        
        if ( !empty( $this->options[ "id" ] ) ) $this->id = $this->options[ "id" ];
        else $this->options[ "id" ] = $this->id;
        
        if ( !isset( $this->plugin ) ) $this->plugin = [];
        if ( !isset( $this->plugin[ "decimals" ] ) ) $this->plugin[ "decimals" ] = "2";
        if ( !isset( $this->plugin[ "thousandSeparator" ] ) ) $this->plugin[ "thousandSeparator" ] = ( !empty( Yii::$app->formatter->thousandSeparator ) ? Yii::$app->formatter->thousandSeparator : "" );
        if ( !isset( $this->plugin[ "decimalSeparator" ] ) ) $this->plugin[ "decimalSeparator" ] = ( !empty( Yii::$app->formatter->decimalSeparator ) ? Yii::$app->formatter->decimalSeparator : "." );
        
        $this->getView()->registerJs( "$('#".$this->id."').formattedNumber(" . Json::encode( $this->plugin ) . ");" );
        
        if ( !empty( $this->model ) ) {
            $input = Html::activeTextInput($this->model, $this->attribute, $this->options);
        } else {
            $input = Html::textInput($this->name, $this->value, $this->options);
        }
        return $input;
    }
}