.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 35 
		addi    x5 , x0 , 57 
		addi    x2 , x0 , 35 
		bltu    x28 , x5 , Less_i 
		bgeu    x28 , x5 , Bigger_i 
Less_i:
		addi    x13 , x2 , 73 
		andi    x16 , x2 , 176 
		add     x16 , x16 , x13 
		srli    x16 , x16 , 0 
		addi    x31 , x0 , 140 
		bne     x16 , x31 , Fail 
Bigger_i:
		ori     x13 , x2 , 56 
		xori    x16 , x2 , 88 
		add     x16 , x16 , x13 
		srai    x16 , x16 , 3 
		addi    x31 , x0 , 22 
		bne     x16 , x31 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
