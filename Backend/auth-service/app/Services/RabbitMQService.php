<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use Illuminate\Support\Facades\Log;

class RabbitMQService
{
    protected $connection;
    protected $channel;
    
    public function __construct()
    {
        try {
            $this->connection = new AMQPStreamConnection(
                env('RABBITMQ_HOST', 'rabbitmq'),
                env('RABBITMQ_PORT', 5672),
                env('RABBITMQ_USER', 'commune'),
                env('RABBITMQ_PASSWORD', 'commune_password'),
                env('RABBITMQ_VHOST', '/')
            );
            
            $this->channel = $this->connection->channel();
            
            // Déclarer les exchanges
            $this->channel->exchange_declare('user_events', 'topic', false, true, false);
            
        } catch (\Exception $e) {
            Log::error('RabbitMQ connection error: ' . $e->getMessage());
        }
    }
    
    public function publishUserEvent($routingKey, $data)
    {
        try {
            $msg = new AMQPMessage(
                json_encode($data),
                [
                    'content_type' => 'application/json',
                    'delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT
                ]
            );
            
            $this->channel->basic_publish($msg, 'user_events', $routingKey);
            
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to publish message: ' . $e->getMessage());
            return false;
        }
    }
    
    public function __destruct()
    {
        if ($this->channel) {
            $this->channel->close();
        }
        
        if ($this->connection) {
            $this->connection->close();
        }
    }
}