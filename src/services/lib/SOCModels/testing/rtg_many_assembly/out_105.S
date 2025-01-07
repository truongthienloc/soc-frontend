.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , 170 
		addi    x19 , x0 , 127 
		addi    x20 , x0 , 133 
		bltu    x29 , x19 , Less_i 
		bgeu    x29 , x19 , Bigger_i 
Less_i:
		addi    x26 , x20 , 23 
		andi    x8 , x20 , 40 
		add     x8 , x8 , x26 
		srli    x8 , x8 , 4 
		addi    x14 , x0 , 9 
		bne     x8 , x14 , Fail 
Bigger_i:
		ori     x26 , x20 , 94 
		xori    x8 , x20 , 146 
		add     x8 , x8 , x26 
		srai    x8 , x8 , 3 
		addi    x14 , x0 , 30 
		bne     x8 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
