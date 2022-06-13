**node-picogw-plugin-omron2jcie-bu01** is an optional plugin module for [PicoGW](https://github.com/KAIT-HEMS/node-picogw), a [Home Automation](https://en.wikipedia.org/wiki/Home_automation) and [Building Automation](https://en.wikipedia.org/wiki/Building_automation) devices gateway server, developed by [Kanagawa Institute of Technology, Smart House Research Center](http://sh-center.org/en/), released under [MIT license](https://opensource.org/licenses/mit-license.php).

### Plugin API

Database plugin provides an API for obtaining sensor values from [OMRON 2JCIE-BU sensor (USB version)](https://www.fa.omron.co.jp/products/family/3724/).
Note it requires sudo operation during initialization. It is recommended that the shell to run this module allows sudo without a passcode.

You can also pre-execute setup.sh before running this plugin.

#### GET /v1/omron2jcie-bu01/

Show all sensor values.

#### Tips

+ Run PicoGW & this plugin on boot

/etc/rc.local

```
/home/pi/node-picogw-plugin-omron2jcie-bu01/setup.sh &
```
crontab -e

```
@reboot (. ~/node-picogw-plugin-omron2jcie-bu01/crontab/cronjob.env.sh; ~/node-picogw-plugin-omron2jcie-bu01/crontab/runpicogw.sh > ~/node-picogw-plugin-omron2jcie-bu01/crontab/picogw.log; )
```

Note crontab/cronjob.env.sh|runpicogw.sh should be properly modified.

##### References

+ [crontab with nvm](https://gist.github.com/simov/cdbebe2d65644279db1323042fcf7624)
