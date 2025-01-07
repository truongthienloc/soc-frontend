.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , 43 
		addi    x19 , x0 , 166 
		addi    x12 , x0 , 132 
		bltu    x6 , x19 , Less_i 
		bgeu    x6 , x19 , Bigger_i 
Less_i:
		addi    x30 , x12 , 78 
		andi    x10 , x12 , 159 
		add     x10 , x10 , x30 
		srli    x10 , x10 , 4 
		addi    x2 , x0 , 21 
		bne     x10 , x2 , Fail 
Bigger_i:
		ori     x30 , x12 , 70 
		xori    x10 , x12 , 9 
		add     x10 , x10 , x30 
		srai    x10 , x10 , 2 
		addi    x2 , x0 , 84 
		bne     x10 , x2 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
