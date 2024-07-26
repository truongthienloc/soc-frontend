.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 132 
		addi    x3 , x0 , 138 
		addi    x15 , x0 , 188 
		bltu    x12 , x3 , Less_i 
		bgeu    x12 , x3 , Bigger_i 
Less_i:
		addi    x14 , x15 , 192 
		andi    x23 , x15 , 16 
		add     x23 , x23 , x14 
		srli    x23 , x23 , 1 
		addi    x26 , x0 , 198 
		bne     x23 , x26 , Fail 
Bigger_i:
		ori     x14 , x15 , 194 
		xori    x23 , x15 , 52 
		add     x23 , x23 , x14 
		srai    x23 , x23 , 4 
		addi    x26 , x0 , 24 
		bne     x23 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
