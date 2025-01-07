.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 78 
		addi    x11 , x0 , 101 
		addi    x31 , x0 , 155 
		bltu    x9 , x11 , Less_i 
		bgeu    x9 , x11 , Bigger_i 
Less_i:
		addi    x18 , x31 , 197 
		andi    x12 , x31 , 141 
		add     x12 , x12 , x18 
		srli    x12 , x12 , 0 
		addi    x7 , x0 , 489 
		bne     x12 , x7 , Fail 
Bigger_i:
		ori     x18 , x31 , 156 
		xori    x12 , x31 , 108 
		add     x12 , x12 , x18 
		srai    x12 , x12 , 0 
		addi    x7 , x0 , 406 
		bne     x12 , x7 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
