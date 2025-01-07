.text

#The program checks the ALU instruction in I_type

Main:
		addi    x16 , x0 , 112 
		addi    x29 , x0 , 27 
		addi    x2 , x0 , 136 
		bltu    x16 , x29 , Less_i 
		bgeu    x16 , x29 , Bigger_i 
Less_i:
		addi    x7 , x2 , 130 
		andi    x8 , x2 , 195 
		add     x8 , x8 , x7 
		srli    x8 , x8 , 4 
		addi    x26 , x0 , 24 
		bne     x8 , x26 , Fail 
Bigger_i:
		ori     x7 , x2 , 71 
		xori    x8 , x2 , 41 
		add     x8 , x8 , x7 
		srai    x8 , x8 , 4 
		addi    x26 , x0 , 23 
		bne     x8 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
