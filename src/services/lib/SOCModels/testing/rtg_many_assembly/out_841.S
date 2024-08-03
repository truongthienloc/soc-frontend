.text

#The program checks the ALU instruction in I_type

Main:
		addi    x31 , x0 , 2 
		addi    x22 , x0 , 149 
		addi    x21 , x0 , 109 
		bltu    x31 , x22 , Less_i 
		bgeu    x31 , x22 , Bigger_i 
Less_i:
		addi    x23 , x21 , 29 
		andi    x12 , x21 , 181 
		add     x12 , x12 , x23 
		srli    x12 , x12 , 4 
		addi    x8 , x0 , 10 
		bne     x12 , x8 , Fail 
Bigger_i:
		ori     x23 , x21 , 164 
		xori    x12 , x21 , 192 
		add     x12 , x12 , x23 
		srai    x12 , x12 , 2 
		addi    x8 , x0 , 102 
		bne     x12 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
