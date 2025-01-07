.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , 108 
		addi    x18 , x0 , 173 
		addi    x16 , x0 , 87 
		bltu    x3 , x18 , Less_i 
		bgeu    x3 , x18 , Bigger_i 
Less_i:
		addi    x5 , x16 , 73 
		andi    x10 , x16 , 176 
		add     x10 , x10 , x5 
		srli    x10 , x10 , 1 
		addi    x17 , x0 , 88 
		bne     x10 , x17 , Fail 
Bigger_i:
		ori     x5 , x16 , 173 
		xori    x10 , x16 , 64 
		add     x10 , x10 , x5 
		srai    x10 , x10 , 0 
		addi    x17 , x0 , 278 
		bne     x10 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
