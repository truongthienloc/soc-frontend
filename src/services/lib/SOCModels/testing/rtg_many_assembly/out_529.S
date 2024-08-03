.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 47 
		addi    x16 , x0 , 44 
		addi    x26 , x0 , 197 
		bltu    x28 , x16 , Less_i 
		bgeu    x28 , x16 , Bigger_i 
Less_i:
		addi    x17 , x26 , 14 
		andi    x3 , x26 , 120 
		add     x3 , x3 , x17 
		srli    x3 , x3 , 1 
		addi    x13 , x0 , 137 
		bne     x3 , x13 , Fail 
Bigger_i:
		ori     x17 , x26 , 90 
		xori    x3 , x26 , 164 
		add     x3 , x3 , x17 
		srai    x3 , x3 , 3 
		addi    x13 , x0 , 40 
		bne     x3 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
