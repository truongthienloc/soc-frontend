.text

#The program finds the value of fibonacci 

Fibo:
		addi    x13 , x0 , 8 
		addi    x14 , x0 , 1 
		addi    x18 , x0 , 1 
		addi    x28 , x0 , 3 
		beq     x13 , x0 , Result0 
		beq     x13 , x18 , Result1 
Loop: 
		blt     x13 , x28 , Result 
		add     x9 , x14 , x18 
		addi    x14 , x18 , 0 
		addi    x18 , x9 , 0 
		addi    x28 , x28 , 1 
		jal     x0 , Loop 
Result0:
		addi    x9 , x0 , 0 
		addi    x22 , x0 , 0 
		bne     x9 , x22 , Fail 
Result1:
		addi    x9 , x0 , 1 
		addi    x25 , x0 , 1 
		bne     x9 , x25 , Fail 
Result:
		addi    x11 , x0 , 21 
		bne     x9 , x11 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
