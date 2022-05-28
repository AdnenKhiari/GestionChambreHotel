import { motion } from "framer-motion"
import { scale } from "../../lib/Animations"
import { IUniversalTable } from "../../types"

const TableContent = ({tableData,onclick} : {tableData : IUniversalTable.ItableData,onclick: (dt : any) => void})=>{
	//console.log("TD",tableData)
   // return <TestData/>
    return <div className="table-container" >
		<table>
			<thead>
			<tr>
			{tableData.header.map((dt : any,index : number)=>{
			return <th key={index}>{dt}</th>
			})}
			</tr>
		</thead>
		<br />        

		<motion.tbody variants={scale}>
        {tableData.body && tableData.body.map((row : any,index : number)=>{
            return <tr key={index} onClick={(e)=>onclick(row)}> 
            {row.map((cell : any,index2: number)=>{
                return <td key={index2*100}>{cell}</td>
            })
            }</tr>
        })}
		</motion.tbody>

    </table>
	</div>
}
/*const TestData = ()=>{
    return <div className="table-container"><table>
		<thead>	
		<tr>
		<th>phone</th>
		<th>name</th>
		<th>postalZip</th>
		<th>text</th>
		<th>numberrange</th>
		<th>region</th>
		<th>country</th>
		<th>currency</th>
		<th>list</th>
		</tr>
	</thead>
	<br />
	<tbody>
	<tr>
		<td>(925) 642-6761</td>
		<td>Yolanda Paul</td>
		<td>63674</td>
		<td>lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse</td>
		<td>0</td>
		<td>New South Wales</td>
		<td>France</td>
		<td>$91.44</td>
		<td>11</td>
	</tr>
	<tr>
		<td>1-484-536-6385</td>
		<td>Garth Hawkins</td>
		<td>83744</td>
		<td>ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci</td>
		<td>1</td>
		<td>Limburg</td>
		<td>Austria</td>
		<td>$28.13</td>
		<td>1</td>
	</tr>
	<tr>
		<td>1-675-207-2740</td>
		<td>Nasim Lawson</td>
		<td>62545</td>
		<td>odio. Phasellus at augue id ante dictum cursus. Nunc mauris</td>
		<td>9</td>
		<td>North Island</td>
		<td>Belgium</td>
		<td>$31.33</td>
		<td>19</td>
	</tr>
	<tr>
		<td>(255) 573-7147</td>
		<td>Orlando Mcneil</td>
		<td>Y5J 8W5</td>
		<td>Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit</td>
		<td>0</td>
		<td>São Paulo</td>
		<td>Costa Rica</td>
		<td>$3.12</td>
		<td>17</td>
	</tr>
	<tr>
		<td>(827) 823-8999</td>
		<td>Audrey Kramer</td>
		<td>88045</td>
		<td>metus. Aenean sed pede nec ante blandit viverra. Donec tempus,</td>
		<td>2</td>
		<td>Vorarlberg</td>
		<td>China</td>
		<td>$75.09</td>
		<td>13</td>
	</tr>
	<tr>
		<td>1-876-621-4673</td>
		<td>Veda Goff</td>
		<td>4561</td>
		<td>turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi</td>
		<td>10</td>
		<td>Kahramanmaraş</td>
		<td>France</td>
		<td>$6.96</td>
		<td>7</td>
	</tr>
	<tr>
		<td>1-834-247-7288</td>
		<td>Vera Carver</td>
		<td>309821</td>
		<td>ipsum porta elit, a feugiat tellus lorem eu metus. In</td>
		<td>6</td>
		<td>Manipur</td>
		<td>Norway</td>
		<td>$49.39</td>
		<td>9</td>
	</tr>
	<tr>
		<td>1-377-899-4111</td>
		<td>Melodie Yates</td>
		<td>T1L 3H2</td>
		<td>auctor odio a purus. Duis elementum, dui quis accumsan convallis,</td>
		<td>1</td>
		<td>Piemonte</td>
		<td>South Korea</td>
		<td>$89.81</td>
		<td>3</td>
	</tr>
	<tr>
		<td>(268) 476-6527</td>
		<td>Stewart Berg</td>
		<td>358180</td>
		<td>a purus. Duis elementum, dui quis accumsan convallis, ante lectus</td>
		<td>5</td>
		<td>Kherson oblast</td>
		<td>Vietnam</td>
		<td>$62.20</td>
		<td>5</td>
	</tr>
	<tr>
		<td>1-276-768-1595</td>
		<td>Sebastian Le</td>
		<td>2206</td>
		<td>metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec</td>
		<td>4</td>
		<td>Wielkopolskie</td>
		<td>Netherlands</td>
		<td>$38.43</td>
		<td>19</td>
	</tr>
	<tr>
		<td>(215) 674-0637</td>
		<td>Xavier Noel</td>
		<td>28173</td>
		<td>pharetra sed, hendrerit a, arcu. Sed et libero. Proin mi.</td>
		<td>4</td>
		<td>Cundinamarca</td>
		<td>Austria</td>
		<td>$0.80</td>
		<td>17</td>
	</tr>
	<tr>
		<td>(717) 432-4924</td>
		<td>Brendan Kinney</td>
		<td>183392</td>
		<td>Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue</td>
		<td>6</td>
		<td>Kujawsko-pomorskie</td>
		<td>Turkey</td>
		<td>$38.86</td>
		<td>1</td>
	</tr>
	<tr>
		<td>(739) 631-2878</td>
		<td>Hilda Swanson</td>
		<td>BN1V 7YE</td>
		<td>diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec,</td>
		<td>5</td>
		<td>Santander</td>
		<td>Turkey</td>
		<td>$7.67</td>
		<td>15</td>
	</tr>
	<tr>
		<td>(534) 731-3283</td>
		<td>Stewart Morton</td>
		<td>63855</td>
		<td>vel est tempor bibendum. Donec felis orci, adipiscing non, luctus</td>
		<td>8</td>
		<td>Kerala</td>
		<td>Nigeria</td>
		<td>$42.27</td>
		<td>19</td>
	</tr>
	<tr>
		<td>(818) 917-0564</td>
		<td>Marshall Nash</td>
		<td>391484</td>
		<td>ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam</td>
		<td>1</td>
		<td>Dalarnas län</td>
		<td>United States</td>
		<td>$67.77</td>
		<td>17</td>
	</tr>
	<tr>
		<td>1-464-940-1167</td>
		<td>Troy Mckay</td>
		<td>19377</td>
		<td>eu, placerat eget, venenatis a, magna. Lorem ipsum dolor sit</td>
		<td>6</td>
		<td>Cantabria</td>
		<td>India</td>
		<td>$33.09</td>
		<td>9</td>
	</tr>
	<tr>
		<td>(697) 364-8137</td>
		<td>Cade Morin</td>
		<td>78922</td>
		<td>lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc</td>
		<td>8</td>
		<td>South Island</td>
		<td>Spain</td>
		<td>$15.12</td>
		<td>15</td>
	</tr>
	<tr>
		<td>1-719-127-6173</td>
		<td>Sebastian Beach</td>
		<td>527741</td>
		<td>varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla</td>
		<td>8</td>
		<td>Khánh Hòa</td>
		<td>China</td>
		<td>$3.32</td>
		<td>3</td>
	</tr>
	<tr>
		<td>(234) 406-1292</td>
		<td>Maryam Bates</td>
		<td>VI3W 5OG</td>
		<td>lobortis risus. In mi pede, nonummy ut, molestie in, tempus</td>
		<td>5</td>
		<td>Sussex</td>
		<td>South Africa</td>
		<td>$70.96</td>
		<td>5</td>
	</tr>
	<tr>
		<td>(753) 526-4077</td>
		<td>Warren Rhodes</td>
		<td>454268</td>
		<td>dui quis accumsan convallis, ante lectus convallis est, vitae sodales</td>
		<td>6</td>
		<td>Magallanes y Antártica Chilena</td>
		<td>Italy</td>
		<td>$74.44</td>
		<td>11</td>
	</tr>
	<tr>
		<td>(145) 960-1235</td>
		<td>Arsenio Black</td>
		<td>3224</td>
		<td>ultrices sit amet, risus. Donec nibh enim, gravida sit amet,</td>
		<td>4</td>
		<td>Saskatchewan</td>
		<td>Poland</td>
		<td>$66.99</td>
		<td>3</td>
	</tr>
	<tr>
		<td>(803) 388-5619</td>
		<td>Brandon Franks</td>
		<td>152162</td>
		<td>molestie in, tempus eu, ligula. Aenean euismod mauris eu elit.</td>
		<td>9</td>
		<td>Leinster</td>
		<td>South Africa</td>
		<td>$73.54</td>
		<td>7</td>
	</tr>
	<tr>
		<td>(823) 925-8578</td>
		<td>Walker Barlow</td>
		<td>3575</td>
		<td>gravida sit amet, dapibus id, blandit at, nisi. Cum sociis</td>
		<td>7</td>
		<td>Yucatán</td>
		<td>Germany</td>
		<td>$88.12</td>
		<td>17</td>
	</tr>
	<tr>
		<td>(940) 775-4322</td>
		<td>Channing Noel</td>
		<td>30431</td>
		<td>Ut semper pretium neque. Morbi quis urna. Nunc quis arcu</td>
		<td>8</td>
		<td>Sardegna</td>
		<td>Spain</td>
		<td>$71.25</td>
		<td>15</td>
	</tr>
	<tr>
		<td>1-690-119-7675</td>
		<td>Griffith Roy</td>
		<td>27256</td>
		<td>porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris</td>
		<td>7</td>
		<td>East Region</td>
		<td>Chile</td>
		<td>$1.34</td>
		<td>7</td>
	</tr>
	<tr>
		<td>1-946-647-1032</td>
		<td>Jordan Banks</td>
		<td>878882</td>
		<td>nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor sit</td>
		<td>0</td>
		<td>Pará</td>
		<td>Pakistan</td>
		<td>$68.58</td>
		<td>19</td>
	</tr>
	<tr>
		<td>(138) 492-2111</td>
		<td>Inga Diaz</td>
		<td>8583</td>
		<td>sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo</td>
		<td>9</td>
		<td>South Australia</td>
		<td>Ireland</td>
		<td>$0.91</td>
		<td>3</td>
	</tr>
	<tr>
		<td>(877) 226-7187</td>
		<td>Demetria Franklin</td>
		<td>325775</td>
		<td>sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus</td>
		<td>1</td>
		<td>Alajuela</td>
		<td>Philippines</td>
		<td>$66.96</td>
		<td>11</td>
	</tr>
	<tr>
		<td>1-534-409-4757</td>
		<td>Chadwick Arnold</td>
		<td>8113</td>
		<td>id risus quis diam luctus lobortis. Class aptent taciti sociosqu</td>
		<td>7</td>
		<td>Konya</td>
		<td>Ireland</td>
		<td>$17.86</td>
		<td>5</td>
	</tr>
	<tr>
		<td>(391) 248-2278</td>
		<td>Camden Grant</td>
		<td>312284</td>
		<td>Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec,</td>
		<td>4</td>
		<td>Gelderland</td>
		<td>Mexico</td>
		<td>$95.37</td>
		<td>13</td>
	</tr>
	<tr>
		<td>(437) 732-2229</td>
		<td>Kylan Mccoy</td>
		<td>09274</td>
		<td>lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam</td>
		<td>1</td>
		<td>Piura</td>
		<td>Nigeria</td>
		<td>$38.65</td>
		<td>17</td>
	</tr>
	<tr>
		<td>1-949-873-6814</td>
		<td>Benedict Bell</td>
		<td>45295</td>
		<td>mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam</td>
		<td>5</td>
		<td>North Jeolla</td>
		<td>Canada</td>
		<td>$14.89</td>
		<td>11</td>
	</tr>
	<tr>
		<td>(978) 986-2553</td>
		<td>Damian Velazquez</td>
		<td>855417</td>
		<td>Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec</td>
		<td>1</td>
		<td>Gelderland</td>
		<td>Canada</td>
		<td>$59.03</td>
		<td>13</td>
	</tr>
	<tr>
		<td>1-321-626-6178</td>
		<td>Quintessa Bennett</td>
		<td>82507</td>
		<td>commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus a ultricies</td>
		<td>5</td>
		<td>Bengkulu</td>
		<td>Spain</td>
		<td>$97.38</td>
		<td>7</td>
	</tr>
	<tr>
		<td>(318) 187-8301</td>
		<td>Quin Boyer</td>
		<td>4578</td>
		<td>feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum</td>
		<td>3</td>
		<td>Benue</td>
		<td>India</td>
		<td>$8.61</td>
		<td>7</td>
	</tr>
	<tr>
		<td>1-126-932-4652</td>
		<td>Hammett Boyd</td>
		<td>8641</td>
		<td>mattis velit justo nec ante. Maecenas mi felis, adipiscing fringilla,</td>
		<td>10</td>
		<td>Santander</td>
		<td>Ireland</td>
		<td>$39.71</td>
		<td>3</td>
	</tr>
	<tr>
		<td>1-248-752-8782</td>
		<td>Emerson Duncan</td>
		<td>4511</td>
		<td>In at pede. Cras vulputate velit eu sem. Pellentesque ut</td>
		<td>10</td>
		<td>South Chungcheong</td>
		<td>Italy</td>
		<td>$92.12</td>
		<td>19</td>
	</tr>
	<tr>
		<td>(185) 212-5737</td>
		<td>Denise Adams</td>
		<td>465421</td>
		<td>diam. Pellentesque habitant morbi tristique senectus et netus et malesuada</td>
		<td>2</td>
		<td>Innlandet</td>
		<td>Nigeria</td>
		<td>$63.39</td>
		<td>1</td>
	</tr>
	<tr>
		<td>1-535-298-8153</td>
		<td>Graiden Craft</td>
		<td>402686</td>
		<td>in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est</td>
		<td>6</td>
		<td>Western Australia</td>
		<td>Ukraine</td>
		<td>$94.01</td>
		<td>1</td>
	</tr>
	<tr>
		<td>1-888-542-3818</td>
		<td>Sasha Jacobson</td>
		<td>46-927</td>
		<td>lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus.</td>
		<td>0</td>
		<td>Hatay</td>
		<td>New Zealand</td>
		<td>$12.68</td>
		<td>5</td>
	</tr>
	</tbody>
	
</table>
</div>
}
*/
export default TableContent