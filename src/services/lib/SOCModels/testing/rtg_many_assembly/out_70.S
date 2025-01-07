.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , 129 
		addi    x6 , x0 , 57 
		addi    x1 , x0 , 63 
		bltu    x7 , x6 , Less_i 
		bgeu    x7 , x6 , Bigger_i 
Less_i:
		addi    x30 , x1 , 140 
		andi    x20 , x1 , 25 
		add     x20 , x20 , x30 
		srli    x20 , x20 , 2 
		addi    x14 , x0 , 57 
		bne     x20 , x14 , Fail 
Bigger_i:
		ori     x30 , x1 , 67 
		xori    x20 , x1 , 43 
		add     x20 , x20 , x30 
		srai    x20 , x20 , 1 
		addi    x14 , x0 , 73 
		bne     x20 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
