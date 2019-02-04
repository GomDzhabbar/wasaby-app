require(['Application/_Config/Config'], (module) => {
   const Config = module.default;
   const stringValue = 'StringValue';
   const numValue = 42;
   const boolValue = true;
   const cfg =  {
      'KeyStr':stringValue,
      'KeyNum':numValue,
      'KeyBool':boolValue,
   };
   const config = new Config(cfg);
   describe('Config', function () {
      it('get string value', function () {
         assert.strictEqual(stringValue, config.get('KeyStr'), 'String value is broken');
      });
      it('get number value', function () {
         assert.strictEqual(numValue, config.get('KeyNum'), 'Number value is broken');
      });
      it('get boolean value', function () {
         assert.strictEqual(boolValue, config.get('KeyBool'), 'Boolean value is broken');
      });
      it('getState()', function () {
         assert.strictEqual(cfg, config.getState(), 'State is broken');
      });
   });
});