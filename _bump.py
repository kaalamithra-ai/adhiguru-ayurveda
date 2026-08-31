imgs = ['malhotra.jpg.jpeg','manmohan.jpg.jpeg','indera.jpg.jpeg','rajkumar.jpg.jpeg','ramarao.jpg.jpeg','venkatraman.jpg.jpeg','balram.jpg.jpeg','desai.jpg.jpeg','singh.jpg.jpeg','whattrsep.jpg.jpeg','bedi shetty.jpg','pitchamuth.jpg','rajinikanth.jpg','rajiv.jpg','affaris.jpg','abdul.jpg','abdul1.jpg','black.jpg','blqck1.jpg','govind.jpg','police.jpg','income.jpg','jains.jpg','acter.jpg','lal.jpg','tata.jpg','tamil.jpg','rammm.jpg','don.jpg','granny.jpg','grandpa.jpg','kuvempu.jpg']
b = open('index.html','rb').read()
n = 0
for i in imgs:
    old = ('src="' + i + '"').encode()
    new = ('src="' + i + '?v=2"').encode()
    n += b.count(old)
    b = b.replace(old, new)
open('index.html','wb').write(b)
print('replaced:', n)