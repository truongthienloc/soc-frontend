.text

#The program checks the ALU instruction in I_type

Main:
		addi    x2 , x0 , 84 
		addi    x16 , x0 , 22 
		addi    x20 , x0 , 118 
		bltu    x2 , x16 , Less_i 
		bgeu    x2 , x16 , Bigger_i 
Less_i:
		addi    x3 , x20 , 196 
		andi    x28 , x20 , 94 
		add     x28 , x28 , x3 
		srli    x28 , x28 , 0 
		addi    x17 , x0 , 400 
		bne     x28 , x17 , Fail 
Bigger_i:
		ori     x3 , x20 , 121 
		xori    x28 , x20 , 194 
		add     x28 , x28 , x3 
		srai    x28 , x28 , 4 
		addi    x17 , x0 , 19 
		bne     x28 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
