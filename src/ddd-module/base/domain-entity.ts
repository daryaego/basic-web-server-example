export abstract class DomainProps {
  id: number | null;
  ts?: Date;
}

export abstract class DomainEntity<PropsClass extends DomainProps> {
  protected props: PropsClass;

  constructor(props: PropsClass) {
    this.props = props;
  }

  static create<PropsClass extends DomainProps>(
    this: new (props: PropsClass) => DomainEntity<PropsClass>,
    props: Omit<PropsClass, 'id' | 'ts'>,
  ): DomainEntity<PropsClass> {
    const fullProps = {
      ...props,
      id: null,
      ts: new Date(),
    } as PropsClass;

    return new this(fullProps);
  }

  get id() {
    return this.props.id;
  }

  get getProps() {
    return Object.freeze(structuredClone(this.props));
  }
}
