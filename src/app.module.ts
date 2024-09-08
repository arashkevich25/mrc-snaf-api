import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModulesModule } from './modules/modules.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mrc_snaf',
      autoLoadModels: true,
      // In prod version should be false to prevent unexpected scheme changes
      synchronize: true,
      models: [],
    }),
    ModulesModule,
    CoreModule,
  ],
})
export class AppModule {}
