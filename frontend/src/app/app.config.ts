import { environment } from 'src/environments/environment';

export class AppConfig {
    private readonly  DOMAIN = environment.host;

    public readonly Regions = this.DOMAIN + '/';
    public readonly VPC = this.DOMAIN + '/vpc';
    public readonly SUBNET = this.DOMAIN + '/subnet';
}
