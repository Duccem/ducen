import { BaseObject, Primitives, StringValueObject } from '@shared/core';

export class UserConfiguration extends BaseObject {
  constructor(
    public timezone: StringValueObject,
    public lang: StringValueObject,
    public theme: StringValueObject,
  ) {
    super();
  }

  public static fromPrimitives(data: Primitives<UserConfiguration>): UserConfiguration {
    return new UserConfiguration(
      new StringValueObject(data.timezone),
      new StringValueObject(data.lang),
      new StringValueObject(data.theme),
    );
  }

  public toPrimitives(): Primitives<UserConfiguration> {
    return {
      lang: this.lang.value,
      theme: this.theme.value,
      timezone: this.timezone.value,
    };
  }
}
