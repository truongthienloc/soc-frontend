.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , 99 
		addi    x6 , x0 , 91 
		addi    x28 , x0 , 165 
		bltu    x3 , x6 , Less_i 
		bgeu    x3 , x6 , Bigger_i 
Less_i:
		addi    x9 , x28 , 105 
		andi    x29 , x28 , 184 
		add     x29 , x29 , x9 
		srli    x29 , x29 , 1 
		addi    x8 , x0 , 215 
		bne     x29 , x8 , Fail 
Bigger_i:
		ori     x9 , x28 , 6 
		xori    x29 , x28 , 32 
		add     x29 , x29 , x9 
		srai    x29 , x29 , 1 
		addi    x8 , x0 , 150 
		bne     x29 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
