.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , 161 
		addi    x7 , x0 , 122 
		addi    x10 , x0 , 166 
		bltu    x3 , x7 , Less_i 
		bgeu    x3 , x7 , Bigger_i 
Less_i:
		addi    x26 , x10 , 196 
		andi    x4 , x10 , 67 
		add     x4 , x4 , x26 
		srli    x4 , x4 , 4 
		addi    x22 , x0 , 22 
		bne     x4 , x22 , Fail 
Bigger_i:
		ori     x26 , x10 , 186 
		xori    x4 , x10 , 64 
		add     x4 , x4 , x26 
		srai    x4 , x4 , 2 
		addi    x22 , x0 , 105 
		bne     x4 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
