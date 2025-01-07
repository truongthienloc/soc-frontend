.text

#The program checks the ALU instruction in I_type

Main:
		addi    x5 , x0 , 10 
		addi    x1 , x0 , 26 
		addi    x17 , x0 , 45 
		bltu    x5 , x1 , Less_i 
		bgeu    x5 , x1 , Bigger_i 
Less_i:
		addi    x2 , x17 , 39 
		andi    x10 , x17 , 114 
		add     x10 , x10 , x2 
		srli    x10 , x10 , 1 
		addi    x3 , x0 , 58 
		bne     x10 , x3 , Fail 
Bigger_i:
		ori     x2 , x17 , 195 
		xori    x10 , x17 , 143 
		add     x10 , x10 , x2 
		srai    x10 , x10 , 3 
		addi    x3 , x0 , 50 
		bne     x10 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
