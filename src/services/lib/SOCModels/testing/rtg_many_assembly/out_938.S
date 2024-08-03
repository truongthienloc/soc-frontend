.text

#The program checks the ALU instruction in I_type

Main:
		addi    x5 , x0 , 0 
		addi    x31 , x0 , 67 
		sltiu   x26 , x5 , 67 
		bltu    x5 , x31 , Less_i 
		bgeu    x5 , x31 , Bigger_i 
Less_i:
		ori     x21 , x5 , 97 
		sub     x17 , x31 , x5 
		srai    x17 , x17 , 3 
		and     x17 , x17 , x0 
		addi    x3 , x0 , 0 
		beq     x17 , x3 , Pass 
Bigger_i:
		ori     x21 , x5 , 97 
		sub     x17 , x31 , x5 
		srai    x17 , x17 , 0 
		and     x17 , x17 , x0 
		addi    x3 , x0 , 0 
		beq     x17 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
