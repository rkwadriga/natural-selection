<?php declare(strict_types=1);
/**
 * Created 2021-04-11
 * Author Dmitry Kushneriov
 */

namespace App\DBAL;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;

class EnumBacteriaType extends Type
{
    public const ENUM_TYPE = 'enumBacteriaType';

    public const TYPE_EDIBLE = 'Edible Bacteria';
    public const TYPE_OMNIVOROUS = 'Omnivorous Bacteria';
    public const TYPE_PREDATORY = 'Predatory Bacteria';

    public function getAllowedValues(): array
    {
        return [self::TYPE_EDIBLE, self::TYPE_OMNIVOROUS, self::TYPE_PREDATORY];
    }

    public function getSQLDeclaration(array $column, AbstractPlatform $platform): string
    {
        return sprintf("ENUM('%s')", implode("','", $this->getAllowedValues()));
    }

    public function getName(): string
    {
        return self:: ENUM_TYPE;
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform): string
    {
        if (!in_array($value, $this->getAllowedValues())) {
            throw new \InvalidArgumentException("Invalid type");
        }
        return $value;
    }
}