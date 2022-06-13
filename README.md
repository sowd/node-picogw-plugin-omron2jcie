**node-picogw-plugin-omron2jcie** is an optional plugin module for [PicoGW](https://github.com/KAIT-HEMS/node-picogw), a [Home Automation](https://en.wikipedia.org/wiki/Home_automation) and [Building Automation](https://en.wikipedia.org/wiki/Building_automation) devices gateway server, developed by [Kanagawa Institute of Technology, Smart House Research Center](http://sh-center.org/en/), released under [MIT license](https://opensource.org/licenses/mit-license.php).

### Plugin API

Database plugin provides an API for obtaining sensor values from [OMRON 2JCIE-BU sensor (USB version)](https://www.fa.omron.co.jp/products/family/3724/).
Note it requires sudo operation during initialization. It is recommended that the shell to run this module allows sudo without a passcode.

#### GET /v1/omron2jcie/

Show all sensor values.
