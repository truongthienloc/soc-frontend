.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 33 
		addi    x2 , x0 , 123 
		addi    x16 , x0 , 41 
		bltu    x9 , x2 , Less_i 
		bgeu    x9 , x2 , Bigger_i 
Less_i:
		addi    x1 , x16 , 75 
		andi    x17 , x16 , 118 
		add     x17 , x17 , x1 
		srli    x17 , x17 , 1 
		addi    x10 , x0 , 74 
		bne     x17 , x10 , Fail 
Bigger_i:
		ori     x1 , x16 , 72 
		xori    x17 , x16 , 132 
		add     x17 , x17 , x1 
		srai    x17 , x17 , 4 
		addi    x10 , x0 , 17 
		bne     x17 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
