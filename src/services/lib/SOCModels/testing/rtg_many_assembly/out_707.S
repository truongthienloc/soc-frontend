.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , 175 
		addi    x16 , x0 , 125 
		addi    x13 , x0 , 62 
		bltu    x15 , x16 , Less_i 
		bgeu    x15 , x16 , Bigger_i 
Less_i:
		addi    x17 , x13 , 46 
		andi    x30 , x13 , 86 
		add     x30 , x30 , x17 
		srli    x30 , x30 , 2 
		addi    x20 , x0 , 32 
		bne     x30 , x20 , Fail 
Bigger_i:
		ori     x17 , x13 , 119 
		xori    x30 , x13 , 195 
		add     x30 , x30 , x17 
		srai    x30 , x30 , 1 
		addi    x20 , x0 , 190 
		bne     x30 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
