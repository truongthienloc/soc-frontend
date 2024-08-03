.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 49 
		addi    x1 , x0 , 133 
		addi    x16 , x0 , 1 
		bltu    x9 , x1 , Less_i 
		bgeu    x9 , x1 , Bigger_i 
Less_i:
		addi    x30 , x16 , 31 
		andi    x10 , x16 , 27 
		add     x10 , x10 , x30 
		srli    x10 , x10 , 2 
		addi    x14 , x0 , 8 
		bne     x10 , x14 , Fail 
Bigger_i:
		ori     x30 , x16 , 73 
		xori    x10 , x16 , 47 
		add     x10 , x10 , x30 
		srai    x10 , x10 , 0 
		addi    x14 , x0 , 119 
		bne     x10 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
