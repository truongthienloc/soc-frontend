.text

#The program checks the ALU instruction in I_type

Main:
		addi    x17 , x0 , 183 
		addi    x19 , x0 , 171 
		addi    x13 , x0 , 114 
		bltu    x17 , x19 , Less_i 
		bgeu    x17 , x19 , Bigger_i 
Less_i:
		addi    x9 , x13 , 71 
		andi    x22 , x13 , 53 
		add     x22 , x22 , x9 
		srli    x22 , x22 , 0 
		addi    x16 , x0 , 233 
		bne     x22 , x16 , Fail 
Bigger_i:
		ori     x9 , x13 , 194 
		xori    x22 , x13 , 20 
		add     x22 , x22 , x9 
		srai    x22 , x22 , 4 
		addi    x16 , x0 , 21 
		bne     x22 , x16 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
