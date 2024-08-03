.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 22 
		addi    x29 , x0 , 110 
		addi    x9 , x0 , 94 
		bltu    x28 , x29 , Less_i 
		bgeu    x28 , x29 , Bigger_i 
Less_i:
		addi    x14 , x9 , 175 
		andi    x10 , x9 , 58 
		add     x10 , x10 , x14 
		srli    x10 , x10 , 2 
		addi    x23 , x0 , 73 
		bne     x10 , x23 , Fail 
Bigger_i:
		ori     x14 , x9 , 138 
		xori    x10 , x9 , 105 
		add     x10 , x10 , x14 
		srai    x10 , x10 , 4 
		addi    x23 , x0 , 17 
		bne     x10 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
