<?php

namespace App\Customs\Services;

use App\Models\EmailVerificationToken;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Carbon;
use Str;

class EmailVerificationService
{
    public function sendVerificationEmail(Object $user)
    {
        Notification::send($user,new EmailVerificationNotification($this->generateVerificationLink($user->email)));


    }
    /**
     * Génère un lien de vérification signé pour l’utilisateur.
     */
    public function generateVerificationLink(string $email): string
    {
        $checkIfTokenExists = EmailVerificationToken::where('email', $email)->first();
        if ($checkIfTokenExists) {
            $checkIfTokenExists->delete();
        }
        $token=Str::uuid();
        $url=config('app.url')."?token=$token&email=$email";
        $saveToken = EmailVerificationToken::create([
            'email' => $email,
            'token' => $token,
            'expired_at' => Carbon::now()->addMinutes(60),
        ]);
        if ($saveToken) {
            return $url;
        }
    }
}
