.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 182 
		addi    x19 , x0 , 168 
		addi    x15 , x0 , 174 
		bltu    x12 , x19 , Less_i 
		bgeu    x12 , x19 , Bigger_i 
Less_i:
		addi    x31 , x15 , 146 
		andi    x13 , x15 , 163 
		add     x13 , x13 , x31 
		srli    x13 , x13 , 3 
		addi    x5 , x0 , 60 
		bne     x13 , x5 , Fail 
Bigger_i:
		ori     x31 , x15 , 126 
		xori    x13 , x15 , 83 
		add     x13 , x13 , x31 
		srai    x13 , x13 , 1 
		addi    x5 , x0 , 253 
		bne     x13 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
