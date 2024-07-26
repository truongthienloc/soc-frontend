.text

#The program checks the ALU instruction in I_type

Main:
		addi    x14 , x0 , 25 //0
		addi    x27 , x0 , 188//4 
		addi    x28 , x0 , 54  //8
		bltu    x14 , x27 , Less_i // 12   => branch
		bgeu    x14 , x27 , Bigger_i //16
Less_i:
		addi    x4 , x28 , 141 // 20 
		andi    x11 , x28 , 89 // 24
		add     x11 , x11 , x4 //28
		srli    x11 , x11 , 2  //32
		addi    x12 , x0 , 52 //36
		bne     x11 , x12 , Fail //40
Bigger_i:
		ori     x4 , x28 , 50 //44
		xori    x11 , x28 , 183 //48
		add     x11 , x11 , x4 //52
		srai    x11 , x11 , 4 //56
		addi    x12 , x0 , 11 //60
		bne     x11 , x12 , Fail //64
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
