.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 31 
		addi    x11 , x0 , 108 
		addi    x29 , x0 , 50 
		bltu    x12 , x11 , Less_i 
		bgeu    x12 , x11 , Bigger_i 
Less_i:
		addi    x28 , x29 , 115 
		andi    x7 , x29 , 175 
		add     x7 , x7 , x28 
		srli    x7 , x7 , 4 
		addi    x19 , x0 , 12 
		bne     x7 , x19 , Fail 
Bigger_i:
		ori     x28 , x29 , 108 
		xori    x7 , x29 , 59 
		add     x7 , x7 , x28 
		srai    x7 , x7 , 2 
		addi    x19 , x0 , 33 
		bne     x7 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
