.text

#The program checks the ALU instruction in I_type

Main:
		addi    x8 , x0 , 183 
		addi    x21 , x0 , 60 
		addi    x4 , x0 , 142 
		bltu    x8 , x21 , Less_i 
		bgeu    x8 , x21 , Bigger_i 
Less_i:
		addi    x31 , x4 , 30 
		andi    x6 , x4 , 148 
		add     x6 , x6 , x31 
		srli    x6 , x6 , 0 
		addi    x17 , x0 , 304 
		bne     x6 , x17 , Fail 
Bigger_i:
		ori     x31 , x4 , 108 
		xori    x6 , x4 , 53 
		add     x6 , x6 , x31 
		srai    x6 , x6 , 2 
		addi    x17 , x0 , 106 
		bne     x6 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
