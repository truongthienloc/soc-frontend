.text

#The program checks the ALU instruction in I_type

Main:
		addi    x21 , x0 , 88 
		addi    x12 , x0 , 47 
		addi    x3 , x0 , 76 
		bltu    x21 , x12 , Less_i 
		bgeu    x21 , x12 , Bigger_i 
Less_i:
		addi    x15 , x3 , 93 
		andi    x20 , x3 , 42 
		add     x20 , x20 , x15 
		srli    x20 , x20 , 3 
		addi    x18 , x0 , 22 
		bne     x20 , x18 , Fail 
Bigger_i:
		ori     x15 , x3 , 165 
		xori    x20 , x3 , 159 
		add     x20 , x20 , x15 
		srai    x20 , x20 , 4 
		addi    x18 , x0 , 28 
		bne     x20 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
