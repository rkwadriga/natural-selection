<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210411180856 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE bacteria (id INT AUTO_INCREMENT NOT NULL, ecosystem_id INT NOT NULL, type ENUM(\'Edible Bacteria\',\'Omnivorous Bacteria\',\'Predatory Bacteria\') NOT NULL, count INT NOT NULL, INDEX IDX_8D183E2A146249B8 (ecosystem_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ecosystem (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, name VARCHAR(255) NOT NULL, width INT NOT NULL, height INT NOT NULL, duration INT NOT NULL, speed DOUBLE PRECISION NOT NULL, INDEX IDX_ABE8FB39A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE food (id INT AUTO_INCREMENT NOT NULL, ecosystem_id INT NOT NULL, type ENUM(\'Food\') NOT NULL, density DOUBLE PRECISION NOT NULL, reproduction_speed INT NOT NULL, INDEX IDX_D43829F7146249B8 (ecosystem_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bacteria ADD CONSTRAINT FK_8D183E2A146249B8 FOREIGN KEY (ecosystem_id) REFERENCES ecosystem (id)');
        $this->addSql('ALTER TABLE ecosystem ADD CONSTRAINT FK_ABE8FB39A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE food ADD CONSTRAINT FK_D43829F7146249B8 FOREIGN KEY (ecosystem_id) REFERENCES ecosystem (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bacteria DROP FOREIGN KEY FK_8D183E2A146249B8');
        $this->addSql('ALTER TABLE food DROP FOREIGN KEY FK_D43829F7146249B8');
        $this->addSql('DROP TABLE bacteria');
        $this->addSql('DROP TABLE ecosystem');
        $this->addSql('DROP TABLE food');
    }
}
